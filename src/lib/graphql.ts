import { GraphQLClient, gql } from 'graphql-request';

const endpoint = import.meta.env.GRAPHQL_ENDPOINT || 'https://web2025.ecomm360.net/graphql';

export const graphqlClient = new GraphQLClient(endpoint);

// Queries
export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menus(first: 1, where: { slug: "menu-principal" }) {
      edges {
        node {
          menuItems(first: 100) {
            edges {
              node {
                id
                label
                url
                order
                childItems(first: 50) {
                  edges {
                    node {
                      id
                      label
                      url
                      order
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PAGES = gql`
  query GetPages {
    pages(first: 100) {
      edges {
        node {
          id
          title
          slug
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pageBy(uri: $slug) {
      id
      title
      slug
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts(first: 100) {
      edges {
        node {
          id
          title
          slug
          excerpt
          content
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      content
      excerpt
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Fetch functions
export async function getMenuItems() {
  try {
    const data = await graphqlClient.request(GET_MENU_ITEMS);
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return null;
  }
}

export async function getPages() {
  try {
    const data = await graphqlClient.request(GET_PAGES);
    return data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const data = await graphqlClient.request(GET_PAGE_BY_SLUG, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getPosts() {
  try {
    const data = await graphqlClient.request(GET_POSTS);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const data = await graphqlClient.request(GET_POST_BY_SLUG, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
