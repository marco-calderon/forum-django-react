import React from 'react';
import { Answers, ContentContainer, CounterButton, CounterContainer, CounterLabel, Footer, Tag, TagsContainer, Title, User, UserIcon, UserLabel, Wrapper, AnswerLabel } from './styles.js';
import Icon from '@mdi/react';
import { mdiAccount, mdiCheckUnderline, mdiMenuDown, mdiMenuUp } from '@mdi/js';
import { useHistory } from 'react-router-dom';
import { MaxLinesParagraph } from '../../styles/maxLinesParagraph.js';

const PostComponent = ({ data }) => {
  const history = useHistory();
  const { id, title, content, upvotes, tags, creator, answersCount } = data;

  const handleOnClick = () => {
    history.push(`/forum/post/${id}`)
  }

  return (
    <Wrapper>
      <CounterContainer>
        <CounterButton>
          <Icon path={mdiMenuUp} size="30px" />
        </CounterButton>
        <CounterLabel>{ upvotes }</CounterLabel>
        <CounterButton>
          <Icon path={mdiMenuDown} size="30px" />
        </CounterButton>
      </CounterContainer>
      <ContentContainer onClick={handleOnClick}>
        <Title>{ title }</Title>
        <MaxLinesParagraph lines={3}>{ content }</MaxLinesParagraph>
        <TagsContainer>
          {tags && tags.map(t => <Tag>{ t }</Tag>)}
        </TagsContainer>
        <Footer>
          <User>
            <UserIcon>
              <Icon path={mdiAccount} size="14px" color="#1C2146" />
            </UserIcon>
            <UserLabel>{ creator.username }</UserLabel>
          </User>
          <Answers>
            <Icon path={mdiCheckUnderline} size="14px" color="#7884F3" />
            <AnswerLabel>{ answersCount } Answers</AnswerLabel>
          </Answers>
        </Footer>
      </ContentContainer>
    </Wrapper>
  );
}

export default PostComponent;
