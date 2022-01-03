import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import {Date} from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
// 加载所有的文件名称列表作为路由路径
export async function getStaticPaths() {
  //返回可能的id的列表
  const paths = getAllPostIds() // 返回的
  return {
    paths,
    fallback: false
    // fallback: false ==> 如果没有路由匹配，则返回404
    // fallback: true ==> 
    // 1.getStaticPaths返回的路径将在构建时呈现给HTML。
    // 2.在构建时没有生成的路径不会导致404页面。相反，Next.js会在第一次请求访问该路径时提供页面的“回退”版本。
    // 3.在后台，Next.js将静态地生成所请求的路径。对同一路径的后续请求将服务于生成的页面，就像构建时预呈现的其他页面一样。
  }
}
// 根据当前路由对应的params来获取对应的数据
export async function getStaticProps({ params }) {
  //根据id获取文章
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

