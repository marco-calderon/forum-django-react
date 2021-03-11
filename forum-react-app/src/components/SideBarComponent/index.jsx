import React from 'react';
import { useQuery } from '@apollo/client';
import {
  BadgesContainer,
  Badge,
  BadgeIcon,
  BadgeLabel,
  Container,
  FirstSection,
  FollowersLabel,
  Footer,
  FooterLink,
  FooterSection,
  JoinedLabel,
  SecondSection,
  UserBadge,
  UserContainer,
  UserIcon,
  UserInfo,
  UserInfoContainer,
  UserName,
  UserTitle,
  UserTitleContainer,
  Sections,
  StatusLabel,
  TrendCategories,
  BottomContainer,
  TrendTitle,
  TrendTitleContainer,
  TrendIcon,
  TrendCategory,
  TrendCategoryTitle,
  TrendCategorySubtitle,
  RecentActivityContainer,
  RecentContainer,
  Recent,
  RecentIcon,
  RecentInfo,
  RecentComment,
  RecentTime,
  RecentUser,
} from './styles';
import Icon from '@mdi/react';
import { mdiAccount, mdiCheckDecagram, mdiCog } from '@mdi/js';
import { getActivityDescription } from '../../utils/activity_text';
import ReactTimeAgo from 'react-time-ago';
import { TOP_POSTS, TRENDING, RECENT_ACTIVITY } from '../../services/graphql';

const SideBarComponent = () => {
  const { data } = useQuery(TOP_POSTS);
  const trendingResponse = useQuery(TRENDING);
  const recentActivityResponse = useQuery(RECENT_ACTIVITY);

  if (!data) {
    <p>Loading...</p>
  }

  return (
    <Container>
      <UserContainer>
        <UserInfoContainer>
          <UserIcon>
            <Icon path={mdiAccount} size="40px" />
          </UserIcon>
          <UserInfo>
            <UserTitleContainer>
              <UserTitle>Aaron Hall</UserTitle>
              <UserBadge>
                <Icon path={mdiCheckDecagram} size="20px" />
              </UserBadge>
            </UserTitleContainer>
            <UserName>@aaronhall</UserName>
          </UserInfo>
        </UserInfoContainer>
        <Sections>
          <FirstSection>
            <FollowersLabel>4.6M followers</FollowersLabel>
            <JoinedLabel>Joined June 2009</JoinedLabel>
          </FirstSection>
          <SecondSection>
            <BadgesContainer>
              <Badge>
                <BadgeIcon color="#FFD600" />
                <BadgeLabel>227</BadgeLabel>
              </Badge>
              <Badge>
                <BadgeIcon color="#8E8E8E" />
                <BadgeLabel>363</BadgeLabel>
              </Badge>
              <Badge>
                <BadgeIcon color="#B17245" />
                <BadgeLabel>409</BadgeLabel>
              </Badge>
            </BadgesContainer>
            <StatusLabel>Plus Membership</StatusLabel>
          </SecondSection>
        </Sections>
      </UserContainer>
      <BottomContainer>
        <TrendTitleContainer>
          <TrendTitle>Trends for you</TrendTitle>
          <TrendIcon>
            <Icon path={mdiCog} size="16px" />
          </TrendIcon>
        </TrendTitleContainer>
        <TrendCategories>
          {trendingResponse?.data?.trending?.map(c => (
            <TrendCategory key={c.id}>
              <TrendCategoryTitle>{ c.name }</TrendCategoryTitle>
              <TrendCategorySubtitle>{ c.postsCount } Questions</TrendCategorySubtitle>
            </TrendCategory>
          ))}
        </TrendCategories>
        <RecentActivityContainer>
          <TrendTitle>
            Recent Activity
          </TrendTitle>
          <RecentContainer>
            {recentActivityResponse?.data?.recentActivity?.map(a => (
              <Recent key={a.id}>
                <RecentIcon>
                  <Icon path={mdiAccount} size="26px" />
                </RecentIcon>
                <RecentInfo>
                  <RecentUser>@{ a.creator.username }</RecentUser>
                  <RecentComment>{ getActivityDescription(a) }</RecentComment>
                  <RecentTime>
                    <ReactTimeAgo date={new Date(a.createdDate)} />
                  </RecentTime>
                </RecentInfo>
              </Recent>
            ))}
          </RecentContainer>
        </RecentActivityContainer>
        <Footer>
          <FooterSection>
            <FooterLink>About</FooterLink>
            <FooterLink>Privacy</FooterLink>
            <FooterLink>Terms</FooterLink>
            <FooterLink>Languages</FooterLink>
          </FooterSection>
          <FooterSection>
            <FooterLink>Contact</FooterLink>
            <FooterLink>Your Add Choices</FooterLink>
            <FooterLink>Careers</FooterLink>
            <FooterLink>Forum Inc. 2021</FooterLink>
          </FooterSection>
        </Footer>
      </BottomContainer>
    </Container>
  );
};

export default SideBarComponent;
