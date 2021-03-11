import { createMockClient } from 'mock-apollo-client';
import { gql } from '@apollo/client';

export const FEED_POSTS = gql`
  query {
    feedPosts {
      id, title, category { id, name }, content, createdDate, upvotes, downvotes, creator { id, username }, answersCount
    }
  }
`;

export const TOP_POSTS = gql`
  query {
    topPosts {
      id, title, createdDate, rating, upvotes, downvotes
    }
  }
`;

export const TRENDING = gql`
  query {
    trending {
      id, name, description, createdDate, postsCount
    }
  }
`;

export const RECENT_ACTIVITY = gql`
  query {
    recentActivity {
      id, model, action, createdDate, creator { username }
    }
  }
`;

export const feedPostsData = () => {
    return Promise.resolve({
        data: {
            feedPosts: [
                {
                    id: '1',
                    title: 'What are the most surreal places to visit?',
                    category: {
                        id: '1',
                        name: 'travel'
                    },
                    content: 'I’m looking for places that are accessible by car, train or boats. I want to be near of local culture with authentic food, cliffside hikes and coastal views.',
                    createdDate: new Date().toUTCString(),
                    upvotes: 46,
                    downvotes: 0,
                    creator: {
                        id: '1',
                        username: '@davidmiller'
                    },
                    answersCount: 156
                },
                {
                    id: '2',
                    title: 'What is the best forum for graphic designers?',
                    category: {
                        id: '1',
                        name: 'graphicdesign'
                    },
                    content: '',
                    createdDate: new Date().toUTCString(),
                    upvotes: 13,
                    downvotes: 0,
                    creator: {
                        id: '1',
                        username: '@marieblanchet'
                    },
                    answersCount: 25
                },
                {
                    id: '3',
                    title: 'What single scene from a movie is an absolute masterpiece?',
                    category: {
                        id: '1',
                        name: 'cinephile'
                    },
                    content: `Well would I love to know about the visualization and the main concept of the movie. 
                    Please add answers regarding the movie production, actors, characters, roles, dialogues, scenes and other related stuff.
                    Thanks in advance!`,
                    createdDate: new Date().toUTCString(),
                    upvotes: 130,
                    downvotes: 0,
                    creator: {
                        id: '1',
                        username: '@iansmith'
                    },
                    answersCount: 250
                },
            ]
        }
    });
}

export const topPostsData = () => {
    return Promise.resolve({
        data: {

        }
    })
}

export const trendingData = () => {
    return Promise.resolve({
        data: {
            trending: [
                {
                    id: '1',
                    name: 'Tech',
                    description: '',
                    createdDate: new Date().toUTCString(),
                    postsCount: 20
                },
                {
                    id: '2',
                    name: 'AR',
                    description: '',
                    createdDate: new Date().toUTCString(),
                    postsCount: 13
                },
                {
                    id: '3',
                    name: 'Cinema',
                    description: '',
                    createdDate: new Date().toUTCString(),
                    postsCount: 65
                },
            ]
        }
    });
}

export const recentActivityData = () => {
    return Promise.resolve({
        data: {
            recentActivity: [
                {
                    id: '1',
                    model: 'POST',
                    action: 'SELECTED_ANSWER',
                    createdDate: new Date().toUTCString(),
                    creator: {
                        username: '@amyharris'
                    }
                },
                {
                    id: '2',
                    model: 'POST',
                    action: 'CREATED',
                    createdDate: new Date().toUTCString(),
                    creator: {
                        username: '@sambrown'
                    }
                },
                {
                    id: '3',
                    model: 'ANSWER',
                    action: 'ANSWERED',
                    createdDate: new Date().toUTCString(),
                    creator: {
                        username: '@robertdavis'
                    }
                }
            ]
        }
    });
}

export const getMockedClient = () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
        FEED_POSTS,
        feedPostsData
    );
    mockClient.setRequestHandler(
        TRENDING,
        trendingData
    );
    mockClient.setRequestHandler(
        RECENT_ACTIVITY,
        recentActivityData
    );

    return mockClient;
}