//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const startingContent="Welcome to our company's diary webpage, an online platform that encapsulates our collective journey and encapsulates the essence of our brand. Within these virtual pages, we share the stories, milestones, and breakthrough moments that have shaped our company's identity. Here, we invite you to delve into the inner workings of our organization, as we document our triumphs, challenges, and aspirations. Through our diary entries, we open a window into our innovative projects, industry insights, and the passionate individuals who drive our success. This diary serves as a testament to our commitment to transparency, fostering a connection with our valued stakeholders and providing a behind-the-scenes look into our operations. Join us as we embark on this captivating narrative, where creativity thrives, and the spirit of collaboration ignites. Together, we are shaping the future and leaving an indelible mark on the business landscape.";
const aboutContent="Welcome to the About page of our diary, a collective sanctuary where we embark on a shared journey of self-expression and introspection. Within these pages, we strive to capture the essence of our experiences, thoughts, and emotions, weaving together the tapestry of our lives. This diary serves as a testament to our commitment to self-reflection, growth, and personal connection. It is a space where we embrace vulnerability, nurture dreams, and honor the beauty of our inner worlds. Through the power of written words, we seek solace, clarity, and a deeper understanding of ourselves. This About page provides a glimpse into the motivations behind our diary, celebrating the transformative power of personal expression and its impact on our well-being. Join us on this intimate journey of self-discovery, as we navigate the complexities of the human experience and find solace in our collective voice.";
const contactContent="Welcome to our Contact Us webpage, the gateway to forging meaningful connections and fostering open communication. We value your feedback, inquiries, and collaborations, and we encourage you to reach out to us through this dedicated platform. Whether you have questions about our products or services, require support, or simply wish to share your thoughts, we are here to listen and assist.Fill out the contact form or utilize the provided contact details, and let's embark on a conversation that paves the way for mutual growth and shared success.";
const app=express();
const posts=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
  res.render("home",{startingContent: startingContent,posts: posts});
});
app.get("/about",function(req,res)
{
  res.render("about",{aboutContent: aboutContent});
});
app.get("/contact",function(req,res)
{
  res.render("contact",{contactContent: contactContent});
});
app.get("/compose",function(req,res)
{
  res.render("compose");
});
app.post("/compose",function(req,res)
{
  const post=
  {
    title:req.body.postTitle,
    body:req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName",function(req,res)
{
  const requestedTitle=_.lowerCase(req.params.postName);
  posts.forEach(function(post)
  {
    const storedTitle=_.lowerCase(post.title);
    if (storedTitle===requestedTitle)
    {
      res.render("post",{title: post.title, body: post.body});
    }
  });
});
app.listen(3000, function() 
{
  console.log("Server started on port 3000");
});
