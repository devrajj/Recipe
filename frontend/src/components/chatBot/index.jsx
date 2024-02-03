import { useState, useEffect } from "react";
import { Send } from "../../icons/send";
import { getRecipeInfo } from "../../utils/networkUtils";
import styled from "styled-components";

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
`;

const SendButton = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

export default function CustomChatBot() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [recipeContent, setRecipeContent] = useState([
    {
      text: "Sure! Here's a recipe for homemade paneer:\n\nIngredients:\n- 1 liter whole milk\n- 2 tablespoons lemon juice or white vinegar\n- Water, for rinsing\n\nInstructions:\n1. Start by heating the milk in a large pot over medium heat. Stir occasionally to prevent the milk from scorching.\n\n2. Once the milk reaches a gentle boil, reduce the heat to low. Add the lemon juice or white vinegar while stirring continuously. This will cause the milk to curdle and separate into curds (solid) and whey (liquid).\n\n3. Continue stirring gently for a minute or two, until the curds have fully separated from the whey. If the whey still looks milky, add a little more lemon juice or vinegar.\n\n4. Turn off the heat and place a colander lined with a muslin cloth or cheesecloth over a large bowl or in the sink.\n\n5. Pour the curdled milk mixture into the colander, allowing the whey to drain away. Gather all the corners of the cloth and gently squeeze out any excess whey.\n\n6. Rinse the curds under running water to remove any residual lemon juice or vinegar. This step is crucial to remove any tangy taste from the paneer.\n\n7. Twist the cloth to tighten the bundle, then place a weight (such as a heavy pot or a couple of canned goods) on top of the bundled paneer to further press out the whey. Let it sit for about 1 hour, or until it becomes firm.\n\n8. Once the paneer is firm, remove it from the cloth and cut it into cubes or desired shapes. Your homemade paneer is now ready to be used in various recipes!\n\nNote: Paneer can be stored in the refrigerator in an airtight container for up to 2-3 days.\n\nEnjoy your homemade paneer in dishes like palak paneer, paneer tikka, or matar paneer!",
      file: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-H6RvK5h1LfF7olqVAuKWLmiM/user-0ix7QQvhh7GssgoJ40MFPwvD/img-j0EjlHmBL7obGCwHvxuTC5pz.png?st=2024-02-03T07%3A35%3A23Z&se=2024-02-03T09%3A35%3A23Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-03T02%3A26%3A17Z&ske=2024-02-04T02%3A26%3A17Z&sks=b&skv=2021-08-06&sig=gUnU4X5upQ1QFg1T8o/YkzikqGzlyDbeYhbMTMNVX3w%3D",
    },
  ]);
  const [isLogout, setIsLogout] = useState();
  const [sendPrompt, setSendPrompt] = useState(false);
  const [toggleFavourite, setToggleFavourite] = useState(false);
  const [favouriteList, setFavouriteList] = useState("");
  const [isFavouriteIconClicked, setIsFavouriteIconClicked] = useState(false);

  useEffect(() => {
    if (isLogout) {
      //integrate logout api here
    }
  }, [isLogout]);

  useEffect(() => {
    const fetchData = async () => {
      if (sendPrompt && userPrompt && !isLoading) {
        try {
          setIsLoading(true);
          const res = await getRecipeInfo({ userPrompt });
          setUserPrompt("");
          if (res && res.data && res.data.ok && res.data.data) {
            setRecipeContent((prev) => [...prev, res.data.data]);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [sendPrompt, userPrompt, isLoading]);

  return (
    <MainContainer>
      <MainHeading>
        <MainHeadingText>RECIPE CHATBOT</MainHeadingText>
        <Logout onClick={() => setIsLogout(true)}>Logout</Logout>
      </MainHeading>
      <ChatBody>
        <FavouritesContainer>
          <FavouritesText>Favourites</FavouritesText>
          <FavouriteLine></FavouriteLine>
          <FavouritesContent
            onClick={() => setIsFavouriteIconClicked(true)}
            isFavouriteIconClicked={isFavouriteIconClicked}
          >
            {favouriteList}
          </FavouritesContent>
        </FavouritesContainer>
        <ChatBodyAndFooter>
          <ChatBotBody>
            {recipeContent.map((content, index) => (
              <Content>
                <ContentTextAndFile key={index}>
                  {content.text ? (
                    <BodyText key={index}>{content.text}</BodyText>
                  ) : null}
                  {content.file ? (
                    <BodyFile key={index} src={content.file}></BodyFile>
                  ) : null}
                </ContentTextAndFile>
                {content.file || content.text ? (
                  <StarIcon
                    key={index}
                    src={
                      !toggleFavourite
                        ? "/icons/star.svg"
                        : "/icons/goldenStar.png"
                    }
                    height={25}
                    width={25}
                    onClick={() => {
                      setFavouriteList(content.text.trim().slice(0, 100));
                      setToggleFavourite(!toggleFavourite);
                    }}
                  />
                ) : null}
              </Content>
            ))}
          </ChatBotBody>
          <ChatFooter>
            <InputPrompt
              type="text"
              value={userPrompt}
              placeholder="Ask me for a mouthwatering recipe! 🍽️"
              onChange={(e) => setUserPrompt(e.target.value)}
            ></InputPrompt>
            <SendButton
              onClick={() =>
                userPrompt.length && !isLoading
                  ? setSendPrompt(userPrompt)
                  : null
              }
            >
              <Send
                color={
                  isLoading ? "grey" : !userPrompt.length ? "white" : "blue"
                }
                height={40}
                width={30}
              />
            </SendButton>
          </ChatFooter>
        </ChatBodyAndFooter>
      </ChatBody>
    </MainContainer>
  );
}
