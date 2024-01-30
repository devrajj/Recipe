import { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const MainHeading = styled.div``;

const ChatBody = styled.div`
  margin-top: 10px;
  display: flex;
  height: calc(100vh - 150px);
  width: 800px;
  margin-bottom: 10px;
`;

const BodyText = styled.p`
  font-size: 16px;
`;

const ChatFooter = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 7vh;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 10px;
`;

const InputPrompt = styled.input`
  flex: 1;
  padding: 6px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  outline: none;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StarIcon = styled.img`
  margin-top: 12px;
`;

const SendButton = styled.img`
  margin-left: 10px;
  cursor: pointer;
`;

export default function CustomChatBot() {
  const [text, setText] = useState(
    "Hello there how are you there. Hello there how are you there. Hello there how are you there. Hello there how are you there"
  );
  const [toggleFavourite, setToggleFavourite] = useState(false);
  return (
    <MainContainer>
      <MainHeading>Recipe ChatBot</MainHeading>
      <ChatBody>
        <BodyText>{text}</BodyText>
        <StarIcon
          src={!toggleFavourite ? "/icons/star.svg" : "/icons/goldenStar.png"}
          height={25}
          width={25}
          onClick={() => setToggleFavourite(!toggleFavourite)}
        />
      </ChatBody>
      <ChatFooter>
        <InputPrompt placeholder="Ask me for a mouthwatering recipe! 🍽️"></InputPrompt>
        <SendButton src="/icons/right.png" width={40} alt="Send"></SendButton>
      </ChatFooter>
    </MainContainer>
  );
}
