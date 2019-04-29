const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "starman@tesla.com",
        password: "Trekki4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",

          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
    });
  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "Books",
        description: "Y'know, those things you read. Write about them."
      })
      .then((topic) => {
        expect(topic.title).toBe("Books");
        expect(topic.description).toBe("Y'know, those things you read. Write about them.");
        done();
      })
    });

    it("should not create a topic with a missing title or description", (done) => {
      Topic.create({
        title: "Books",
      })
      .then((topic) => {

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });
  });

  describe("#getPosts()", () => {
    it("should return an array of posts associated with a given topic", (done) => {
      Post.create({
        title: "Pigs in spaaaace",
        body: "I just saw some out the window",
        topicId: this.topic.id,
        userId: this.user.id
      })
      .then((post) => {
        this.topic.getPosts()
        .then((postArray) => {
          //loop over all posts in case postArray is out of order
          var postTitleChecker = false;
          for (let i = 0; i < postArray.length; i++){
            if (postArray[i].title === "Pigs in spaaaace"){
              postTitleChecker = true;
              break;
            }
          }
          expect(postTitleChecker).toBe(true);
          done();
        })
      })
    })
  });
});
