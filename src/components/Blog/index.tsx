import React from "react";
import { Card } from "antd";
//import "tailwindcss/tailwind.css";

const blogPosts = [
  {
    title: "How to use sticky note for problem solving",
    date: "20 October 2019",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1738067061/Harris-200-27_5T-21S-Black_720x_cyohup.webp",
  },
  {
    title: "Morning routine to boost your mood",
    date: "25 November 2020",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1738067061/Gelon27TMBlkGrn_720x_myxah0.webp",
  },
  {
    title: "All the features you want to know",
    date: "30 September 2020",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1738067061/Harris_100_26T_Black_26x2_35_720x_lcmon2.webp",
  },
  {
    title: "Minimal workspace for your inspirations",
    date: "13 October 2019",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1738067060/Wind_Chaser_27T_Blk_DMC_Grey_4cda0a42-04f9-4b90-b93f-4e4cc98c104e_720x_qg1c9m.webp",
  },
  {
    title: "What do you want to know about Blockchain",
    date: "20 October 2019",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1738067060/Magnet24TBlkOrg_720x_hkffkl.webp",
  },  {
    title: "What do you want to know about Blockchain",
    date: "20 October 2019",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1738067060/Magnet24TBlkOrg_720x_hkffkl.webp",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section
      className="bg-white dark:bg-gray-900 px-6 py-10 mx-auto container"
      style={{ marginTop: "20px" }}
    >
      <h1
        className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white title "
        style={{ marginBottom: "20px" }}
      >
        Blogs
      </h1>
      <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            hoverable
            cover={
              <img
                className="object-contain h-56 w-full rounded-lg"
                src={post.image}
                alt={post.title}
              />
            }
            className="rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
          >
            <h2 className="text-xl font-semibold hover:underline cursor-pointer">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              On: {post.date}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
