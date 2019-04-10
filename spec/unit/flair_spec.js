const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;


describe("Flair", () => {
  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Famous wells",
        description: "A collection of the most well-known wells."
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "Trending",
          color: "orange",

          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create a flair object with a name, color, and assigned topic", (done) => {
      Flair.create({
        name: "Top 10",
        color: "red",
        topicId: this.topic.id
      })
      .then((flair) => {
        expect(flair.name).toBe("Top 10");
        expect(flair.color).toBe("red");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a post with missing name, color, or assigned topic", (done) => {
      Flair.create({
        name: "Top 10"
      })
      .then((flair) => {
        //will skip this
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Flair.color cannot be null");
        expect(err.message).toContain("Flair.topicId cannot be null");
        done();
      })
    });
  });

  describe("#setTopic", () => {
    it("should associate a topic and a flair together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {
        expect(this.flair.topicId).toBe(this.topic.id);

        this.flair.setTopic(newTopic)
        .then((flair) => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });
      });
    });
  });

  describe("#getTopic", () => {

    it("should return the associated topic", (done) => {
      this.flair.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe("Famous wells");
        done();
      });
    });
  });
});
