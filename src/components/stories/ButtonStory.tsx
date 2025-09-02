import Button from "../Button.tsx";
import StoryBook, { Story } from "./StoryBook.tsx";

function ButtonStory() {
    return (
        <StoryBook>
            <Story title="Default">
                <Button text="My Button" />
            </Story>
            <Story title="hasError={true}">
                <Button text="My Button" hasError />
            </Story>
        </StoryBook>
    );
}

export default ButtonStory;
