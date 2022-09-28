# Pomme's Chat App 🍎 

## 기술 스택

- Typescript, Next.js, TailwindCSS, Firebase 
- 그 외 Lodash, react-icons, react-firebase-hooks, react-linkify-it, dayjs 등을 사용하였습니다.


## 기능 요구사항

- [x] 대화방에서 채팅 기능
- [x] 구글 소셜로그인으로 로그인/로그아웃 
- [x] 비로그인 상태에서 페이지 접속시 로그인 페이지로 이동합니다.
- [x] 프로덕션으로 배포 (URL: https://chat-demo-9bfb2.web.app/) 
- [x] 대화에 URL 이 있는 경우 새탭에서 열기로 확인할 수 있습니다.
- [x] 모바일 반응형 디자인을 지원합니다.
- [x] 아직 새로운 메세지를 읽지 않은 채팅방은 별도로 표기됩니다.
- [x] 대화 상대의 구글 이메일을 등록하여 새로운 채팅방을 생성할 수 있습니다. 

## 추가 구현사항
- [ ] SEO 최적화 (메타태그 적용)
- [ ] Github Actions로 자동 배포
- [ ] 신규 채팅방 생성시 등록된 채팅방 친구들을 팝업으로 확인
- [ ] Firestore DB 보안 규칙 수정
- [ ] 메세지 읽음처리시, Firestore 트랜잭션 사용
