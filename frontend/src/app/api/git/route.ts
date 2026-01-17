import { parseGithubProjectUrl } from "@/utils/actions/github";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { username, projectNumber } = parseGithubProjectUrl(body.url);

    const query = `
      query {
        user(login: "${username}") {
          projectV2(number: ${projectNumber}) {
            id
            title
            items(first: 100) {
              nodes {
                id
                content {
                  __typename
                  ... on Issue {
                    title
                    url
                    state
                    createdAt
                    closedAt
                  }
                  ... on PullRequest {
                    title
                    url
                    state
                    commits(first: 10) {
                      nodes {
                        commit {
                          message
                          committedDate
                          author {
                            name
                            email
                            user {
                              login
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
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent": "NextApp",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.ok ? 200 : response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao conectar no backend." },
      { status: 500 }
    );
  }
}