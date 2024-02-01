import { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #0080000a;
`;

const MainHeading = styled.div`
  display: flex;
  align-items: center;
  margin-left: 72px;
  font-size: 24px;
  font-weight: 600;
  height: 50px;
  color: black;
`;

const ChatBody = styled.div`
  display: flex;
`;

const FavouritesContainer = styled.div`
  background: #0066ff;
  width: 24%;
  border-left: 0.5px solid black;
  border-top-right-radius: 16px;
  border-top: 0.5px solid black;
`;

const FavouritesText = styled.div`
  font-size: 22px;
  color: white;
  font-weight: 700;
  text-align: left;
  margin: 10px 0px 0px 10px;
`;

const FavouritesContent = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: white;
  font-weight: 300;
  margin-top: 15px;
  text-align: left;
  margin: 15px 10px 5px 10px;
  background: #0256d6;
  font-family: Source Sans Pro;
  letter-spacing: 0.00000015px;
  line-height: 17px;
  font-style: normal;
`;

const FavouriteLine = styled.div`
  background: white;
  height: 1.5px;
  width: 50%;
  margin-top: 10px;
  border-radius: 63px;
`;

const FavouritesContent2 = styled.div`
  font-size: 16px;
  color: white;
  font-weight: 300;
  margin-top: 15px;
  text-align: left;
  margin: 15px 10px 5px 10px;
  font-family: Source Sans Pro;
  letter-spacing: 0.00000015px;
  line-height: 17px;
  font-style: normal;
`;

const ChatBotBody = styled.div`
  border-style: groove;
  border-left: 0.5px solid black;
  border-top: 0.5px solid black;
  border-top-left-radius: 16px;
  display: flex;
  flex-direction: column;
  display: flex;
  height: calc(100vh - 53px);
  width: 76%;
  background: white;
`;

const Content = styled.div`
  display: flex;
  margin-left: 16px;
  margin-top: 10px;
  height: 92%;
  justify-content: space-around;
  gap: 10px;
`;

const BodyText = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: left;
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
  margin-top: 16px;
  margin-right: 10px;
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
      <MainHeading>RECIPE CHATBOT</MainHeading>
      <ChatBody>
        <FavouritesContainer>
          <FavouritesText>Favourites</FavouritesText>
          <FavouriteLine></FavouriteLine>
          <FavouritesContent>
            This is favourite content This is favourite ....
          </FavouritesContent>
          <FavouritesContent2>This is favourite content 2</FavouritesContent2>
        </FavouritesContainer>
        <ChatBotBody>
          <Content>
            <BodyText>{text}</BodyText>
            <StarIcon
              src={
                !toggleFavourite ? "/icons/star.svg" : "/icons/goldenStar.png"
              }
              height={25}
              width={25}
              onClick={() => setToggleFavourite(!toggleFavourite)}
            />
          </Content>
          <ChatFooter>
            <InputPrompt placeholder="Ask me for a mouthwatering recipe! 🍽️"></InputPrompt>
            <SendButton
              src="/icons/right.png"
              width={40}
              alt="Send"
            ></SendButton>
          </ChatFooter>
        </ChatBotBody>
      </ChatBody>
    </MainContainer>
  );
}
