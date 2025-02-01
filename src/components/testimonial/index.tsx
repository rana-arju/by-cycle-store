import { Row, Col, Card } from "antd";
import "./testimonial.css";

const { Meta } = Card;

const Testimonials = () => {
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://readymadeui.com/team-2.webp",
    text: "I recently bought a mountain bike from this site, and I’m absolutely thrilled with my purchase! The bike arrived well-packaged and in perfect condition. The assembly instructions were clear, and the quality of the bike exceeded my expectations. Highly recommend!",
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    image: "https://readymadeui.com/team-3.webp",
    text: "This is my second purchase from this store, and I’m just as impressed as the first time. The hybrid bike I ordered is lightweight, durable, and perfect for my daily commute. The delivery was fast, and the customer service team was very helpful when I had questions about sizing.",
  },
  {
    id: 3,
    name: "David Smith",
    image: "https://readymadeui.com/team-4.webp",
    text: "I was hesitant to buy a bike online, but this site made the process so easy. The detailed product descriptions and customer reviews helped me choose the right road bike for my needs. It arrived earlier than expected, and I’ve been enjoying every ride since!",
  },
  {
    id: 4,
    name: "Emily Carter",
    image: "https://readymadeui.com/team-5.webp",
    text: "I bought a kids’ bike for my son, and he loves it! The bike is sturdy, safe, and perfect for his age. The checkout process was smooth, and the delivery was hassle-free. I’ll definitely be shopping here again for our next bike!",
  },
  {
    id: 5,
    name: "James Wilson",
    image: "https://readymadeui.com/team-6.webp",
    text: "The electric bike I purchased is a game-changer! It’s powerful, easy to use, and has made my daily commute so much more enjoyable. The website had a great selection, and the delivery was quick. I’m very happy with my purchase!",
  },
  {
    id: 6,
    name: "Sophia Lee",
    image: "https://readymadeui.com/team-1.webp",
    text: "I’m so glad I found this site! The folding bike I ordered is perfect for my small apartment and my daily commute. It’s lightweight, easy to fold, and rides smoothly. The customer service team was very responsive when I had a question about the warranty. Highly recommend!",
  },
];

  const renderStars = () => {
    return (
      <div className="stars">
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            className="star"
            viewBox="0 0 14 13"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        ))}
        <svg
          className="star gray"
          viewBox="0 0 14 13"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="testimonials-container">
        <h2 className="title header">Customer Review</h2>
    
      <Row gutter={[24, 24]} justify="center">
        {testimonials.map((testimonial) => (
          <Col key={testimonial.id} xs={24} sm={12} lg={8}>
            <Card className="testimonial-card">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="avatar"
              />
              <p>{testimonial.text}</p>
              {renderStars()}
              <Meta title={testimonial.name} className="name" />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
