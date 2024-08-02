"use client";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "@/app/lib/apolloClient";
import Header from "@/app/components/Header";
import Image from "next/image";

interface Post {
  title: string;
  content: string;
  uri: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

const GET_POST = gql`
  query GetPost($uri: String!) {
    postBy(uri: $uri) {
      title
      content
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const uri = window.location.pathname.replace("/", "");
        const response = await apolloClient.query({
          query: GET_POST,
          variables: { uri },
        });
        const postData = response?.data?.postBy;
        setPost(postData);
      } catch (error) {
        console.error("Erro ao fazer a solicitação GraphQL:", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <Header />
      <main className="relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:px-16 mt-20">
        <div className="container max-w-4xl mx-auto">
          {post ? (
            <article className="prose lg:prose-xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              {post.featuredImage?.node?.sourceUrl && (
                <div className="mb-8">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                  />
                </div>
              )}
              <div
                className="prose prose-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          ) : (
            <p className="text-center">Carregando...</p>
          )}
        </div>
      </main>
    </>
  );
}