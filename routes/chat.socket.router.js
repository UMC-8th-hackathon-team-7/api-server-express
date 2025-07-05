import prisma from "../prisma/db.js";
import { getNondisabledUserProfileForSocket, getUserProfile } from "../services/profile.sevice.js";

export const chatSocketRouter = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // 채팅 메시지 수신
    socket.on('message-send', (matchingId, senderId, message, isAssistant) => {
      console.log(`Received message from ${socket.id} for matchingId ${matchingId}:`, message);
      // 모든 클라이언트에게 메시지 전송
      // 저장 로직 필요한데 .. (일단 무시)
      io.to(matchingId).emit('message-receive', { matchingId, senderId, message, isAssistant });
    });

    socket.on('join-chatroom', (matchingId, senderId) => {
      console.log(`User ${senderId} joined chatroom for matchingId ${matchingId}`);
      socket.join(matchingId);
      // 기존 메시지 불러오는 로직 필요
    });

    // 도와주는 사람 프로필 전송 (일반인 전용)
    socket.on('send-assistant-profile', async (matchingId, senderId) => {
      console.log(`User ${senderId} sent profile for matchingId ${matchingId}`);
      const profile = await getNondisabledUserProfileForSocket(userId);
      if (profile === null) {
        io.to(matchingId).emit('profile-not-found', { matchingId, senderId });
        return;
      }
      io.to(matchingId).emit('receive-profile', { matchingId, senderId, profile });
      // 프로필 전송 로직 필요
    })

    // 매칭 상태 변경
    socket.on('change-matching-status', async (matchingId, userId, status) => {
      console.log(`User ${socket.id} changed status for matchingId ${matchingId}:`, status);
      // 프로필을 보고 요청을 거절할 경우
      if (status === "rejected") {
        io.to(matchingId).emit('matching-rejected', {
          matchingId, userId, status
        });
        return;
      }
      // 프로필을 보고 요청을 수락할 경우
      else if (status === "accepted") {
        // 수락 시 자동으로 프로필 전송

        const profile = await getUserProfile(userId);
        io.to(matchingId).emit('matching-accepted', {
          matchingId, userId, status, profile
        });
        return;
      }
      const result = await prisma.matching.update({
        where: { matchingId },
        data: { status },
      });
    })

    // 연결 해제 시
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}