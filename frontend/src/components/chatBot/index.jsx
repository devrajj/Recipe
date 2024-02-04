import { useState, useEffect } from "react";
import { Send } from "../../icons/send";
import { useNavigate } from "react-router-dom";
import {
  getRecipeInfo,
  markAsFavourite,
  markAsUnFavourite,
  getFavouriteList,
  getChatHistory,
  logoutUser,
} from "../../utils/networkUtils";
import styled from "styled-components";
import ErrorModal from "../shared/ErrorModal";
import Modal from "../shared/Modal";
import LoaderComponent from "../shared/Loader";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #0080000a;
`;

const MainHeading = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  cursor: default;
`;

const MainHeadingText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 72px;
  font-size: 24px;
  font-weight: 600;
  color: black;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin-right: 10px;
`;

const ChatBody = styled.div`
  display: flex;
  height: calc(100vh - 50px);
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
  align-items: center;
  font-size: 16px;
  color: white;
  font-weight: 300;
  margin-top: 15px;
  text-align: left;
  margin: 9px 10px 5px 10px;
  background: ${({ isFavouriteIconClicked }) =>
    !isFavouriteIconClicked ? "none" : "#0256d6"};
  font-family: Source Sans Pro;
  letter-spacing: 0.00000015px;
  line-height: 17px;
  font-style: normal;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const FavouriteLine = styled.div`
  background: white;
  height: 1.5px;
  width: 50%;
  margin-top: 10px;
  border-radius: 63px;
`;

const ChatBodyAndFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;
`;

const ChatBotBody = styled.div`
  border-style: groove;
  border-left: 0.5px solid black;
  border-top: 0.5px solid black;
  border-top-left-radius: 16px;
  display: flex;
  flex-direction: column;
  display: flex;
  height: calc(93vh - 50px);
  background: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #c4c4c4;
  }
`;

const ContentTextAndFile = styled.div`
  width: 100%;
  white-space: pre-line;
  height: min-content;
`;

const Content = styled.div`
  display: flex;
  margin-left: 16px;
  margin-top: 10px;
  justify-content: space-around;
  gap: 10px;
`;

const BodyText = styled.p`
  font-family: arial;
  font-size: 16px;
  text-align: left;
`;

const BodyFile = styled.img`
  margin: 0px auto;
  max-height: 300px;
  max-width: 400px;

  object-fit: contain;
`;

const ChatFooter = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 7vh;
  border-radius: 8px;
  background-color: lightgray;
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
  cursor: pointer;
`;

const SendButton = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

const UserText = styled.div`
  display: contents;
  font-weight: 900;
  font-family: system-ui;
  color: brown;
`;

export default function CustomChatBot() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [recipeContent, setRecipeContent] = useState([]);
  const [sendPrompt, setSendPrompt] = useState(false);
  const [favouriteList, setFavouriteList] = useState([]);
  const [isFavouriteIconClicked, setIsFavouriteIconClicked] = useState(false);
  const [error, setError] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    async function fetchRecipeChat() {
      const res = await getChatHistory({ pageNumber: 1, pageLength: 200 });
      if (
        res &&
        res.data &&
        res.data.ok &&
        res.data.data &&
        res.data.data.recipeList
      ) {
        setRecipeContent(res.data.data.recipeList);
      }
    }
    async function fetchFavouriteList() {
      const res = await getFavouriteList({ pageNumber: 1, pageLength: 200 });
      if (
        res &&
        res.data &&
        res.data.ok &&
        res.data.data &&
        res.data.data.favouriteList
      ) {
        setFavouriteList(res.data.data.favouriteList);
      }
    }
    fetchRecipeChat();
    fetchFavouriteList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (sendPrompt && finalPrompt && !isLoading) {
        try {
          setIsLoading(true);
          const res = await getRecipeInfo({ userPrompt: finalPrompt });
          setFinalPrompt("");
          setSendPrompt(false);
          if (res && res.data && res.data.ok && res.data.data) {
            setRecipeContent((prev) => [...prev, res.data.data]);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [sendPrompt, finalPrompt, isLoading]);

  async function handleLogout() {
    try {
      const res = await logoutUser();
      if (res && res.data && res.data.ok && res.data.data) {
        navigate("/");
      } else {
        setError(res.data.err);
      }
    } catch (err) {
      console.error("Signup failed", err);
      setError("Something went wrong");
    }
  }

  const handleFavouriteToggle = async ({ content }) => {
    if (content.isFavourite) {
      await markAsUnFavourite({ recipeId: content._id });
      content.isFavourite = false;
      setFavouriteList((prev) =>
        prev.filter(
          (item) => item.recipeId.toString() !== content._id.toString()
        )
      );
    } else {
      await markAsFavourite({ recipeId: content._id });
      content.isFavourite = true;
      setFavouriteList((prev) => [
        ...prev,
        {
          recipeId: content._id.toString(),
          question: content.question,
          text: content.recipeText,
          file: content.recipeFile,
        },
      ]);
    }
  };

  const closeErrorModal = () => {
    setError("");
  };

  const handleFavouritesContentClick = (content, index) => {
    setClickedIndex(index);
    setIsFavouriteIconClicked(!isFavouriteIconClicked);
    const recipeContentElement = document.getElementById(
      `recipeContent_${content.recipeId}`
    );
    if (recipeContentElement) {
      recipeContentElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <MainContainer>
      <MainHeading>
        <MainHeadingText>RECIPE CHATBOT</MainHeadingText>
        <Logout onClick={handleLogout}>Logout</Logout>
      </MainHeading>
      <ChatBody>
        <FavouritesContainer>
          <FavouritesText>Favourites</FavouritesText>
          <FavouriteLine></FavouriteLine>
          {favouriteList.map((content, index) => {
            return (
              <FavouritesContent
                key={index}
                onClick={() => handleFavouritesContentClick(content, index)}
                isFavouriteIconClicked={
                  clickedIndex === index && isFavouriteIconClicked
                }
              >
                {content.question}
              </FavouritesContent>
            );
          })}
        </FavouritesContainer>
        <ChatBodyAndFooter>
          <ChatBotBody>
            {recipeContent.map((content, index) => (
              <Content id={`recipeContent_${content._id}`} key={index}>
                <ContentTextAndFile key={index}>
                  {content.question && (
                    <BodyText key={index}>
                      <UserText>User:</UserText> {content.question}
                    </BodyText>
                  )}
                  {content.recipeText && (
                    <BodyText key={index}>
                      <UserText>RecipeChatBot:</UserText> {content.recipeText}
                    </BodyText>
                  )}
                  {content.recipeFile ? (
                    <BodyFile key={index} src={content.recipeFile}></BodyFile>
                  ) : (
                    <BodyText key={index}>
                      Sorry, the image cannot be generated due to an invalid
                      recipe prompt.
                    </BodyText>
                  )}
                </ContentTextAndFile>
                {content.recipeFile || content.recipeText ? (
                  <StarIcon
                    key={index}
                    src={
                      !content.isFavourite
                        ? "/icons/star.svg"
                        : "/icons/goldenStar.png"
                    }
                    height={25}
                    width={25}
                    onClick={() => {
                      handleFavouriteToggle({ content });
                    }}
                  />
                ) : null}
              </Content>
            ))}
          </ChatBotBody>
          <ChatFooter>
            <InputPrompt
              type="text"
              value={inputPrompt}
              placeholder="Ask me for a mouthwatering recipe! 🍽️"
              onChange={(e) => {
                setFinalPrompt(e.target.value);
                setInputPrompt(e.target.value);
              }}
            ></InputPrompt>
            <SendButton
              onClick={() => {
                if (finalPrompt.length && !isLoading) {
                  setSendPrompt(finalPrompt);
                  setInputPrompt("");
                }
              }}
            >
              <Send
                color={
                  isLoading ? "grey" : !finalPrompt.length ? "white" : "blue"
                }
                height={40}
                width={30}
              />
            </SendButton>
          </ChatFooter>
        </ChatBodyAndFooter>
      </ChatBody>
      {error && <ErrorModal text={error} customAction={closeErrorModal} />}
      {isLoading ? (
        <Modal
          modalStyle={{
            display: "flex",
            alignItems: "center",
            height: "30px",
            width: "30px",
            borderRadius: "10px",
          }}
        >
          <LoaderComponent extraSpace={true} />
        </Modal>
      ) : null}
    </MainContainer>
  );
}
