import { useContext, useEffect } from "react";
import { AppContext } from "App/App";
import { Button, Variant } from "components/ButtonTemporary";
import { Image, ImageName } from "components/Image";
import { Session } from "lib";

import {
  CompletionViewContainer,
  CompletionViewUpperPartContainer,
  ImageContainer,
  Header1,
  BodyText,
  ButtonsContainer,
  ButtonContainer,
} from "./Completion.components";

type CompletionViewProps = {
  // navigates to the account
  onClickSeeAccounts: () => void;
  // navigates to the settings
  onClickDone: () => void;
};

const Completion = (props: CompletionViewProps): JSX.Element => {
  const { onClickDone, onClickSeeAccounts } = props;
  const context = useContext(AppContext) || {};
  const { password = "" } = context;

  useEffect(() => {
    // Log the user in:
    new Session().setSession(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CompletionViewContainer>
      <CompletionViewUpperPartContainer>
        <ImageContainer>
          <Image imageName={ImageName.SuccessImage} />
        </ImageContainer>

        <Header1>You are all set!</Header1>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          maecenas sed bibendum sed velit. Consequat bibendum nibh netus sed
          erat sed.
        </BodyText>
      </CompletionViewUpperPartContainer>
      <ButtonsContainer>
        <ButtonContainer>
          <Button
            onClick={onClickDone}
            style={{ width: "100%" }}
            variant={Variant.outline}
          >
            Done
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={onClickSeeAccounts}>See Account</Button>
        </ButtonContainer>
      </ButtonsContainer>
    </CompletionViewContainer>
  );
};

export default Completion;
