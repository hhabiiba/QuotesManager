import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/about.css';

const About = () => {
  return (
    <div className='about-container'>
      <Link to="/" className="back-abt"></Link> 
      <h2 className='about-title'>About</h2>
      <div className='about-content'>
      <p>Welcome to Quotephoria, your go-to destination for an eclectic mix of quotes that evoke a wide spectrum of emotions, from joy and inspiration to introspection and resilience. Quotephoria isn't just about the uplifting and motivational; it's a celebration of the complexity of human experience, encompassing the poignant, the raw, and the rebellious.</p>
      <br />
      <p> Myself Habiba Baig, and I'm the founder of Quotephoria. As a lifelong lover of language and literature, I've always been fascinated by the power of words to stir emotions, provoke thoughts, and inspire action. My journey with Quotephoria began as a personal quest to curate a collection that resonated with the diverse range of emotions we encounter in our daily lives.</p>
      <br />
      <p>Driven by my passion for exploring the human condition through literature, I embarked on a mission to create a platform where individuals could find solace, inspiration, and connection through the shared experiences captured within the lines of quotes. Quotephoria is the culmination of that vision—a space where emotions intertwine with words to create an exhilarating tapestry of expression.</p>
      <br />
      <p>Now, you might wonder, why "Quotephoria"? The name is more than just a combination of "quote" and "euphoria." It's a unique concept that encapsulates the diverse emotional landscape of quotes. Just as euphoria represents an intense feeling of joy and elation, Quotephoria embodies the rollercoaster of emotions that quotes can evoke – from the euphoric highs of inspiration to the somber depths of introspection. It's about experiencing the full spectrum of human emotion through the power of words.</p>
      <br />
      <p>So whether you're seeking words of comfort during difficult times, empowerment in the face of adversity, or simply a dose of unfiltered truth, Quotephoria invites you to explore, connect, and find resonance in the rich tapestry of quotes we offer.</p>
      <br />
      <p>Join us on this journey of discovery and emotion as we navigate the labyrinth of human experience, one quote at a time.</p>
      <br />
      </div>
      <hr />
      <div className='about-signature'>
      <em>Welcome to Quotephoria – where emotions meet words in an exhilarating dance of expression.</em>
      <br />
      <div className='about-contact'>
      <strong>Contact: </strong> <a href='contactLink'>info@quotephoria.com</a>
      <br />
    </div>
    </div>
    </div>
  );
}

export default About;
