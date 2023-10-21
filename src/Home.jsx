import { Link, useOutletContext } from "react-router-dom";

function Home() {
    const name = useOutletContext();

  return (
    <>
      <nav>
        <ul>
          <Link to="../home">
            <li className="selected-page">Home</li>
          </Link>
          <Link to="../messages">
            <li>Messages</li>
          </Link>
          <Link to="../profile">
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
      <main>
        <section className="forum-header">
          <h2>Welcome back {name}!</h2>
          <div className="account-div">
            <p>crispnoodlesoup</p>
            <div className="pfp"></div>
          </div>
        </section>
        <section className="forum">
          <div className="posts">
            <div className="user-post">
              <h3>How do I construc</h3>
              <h5>From: bender9000</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores nemo soluta non deserunt rem esse quia expedita
                deleniti ullam amet, repellat doloribus totam earum fuga
                consectetur cupiditate. Quibusdam aspernatur accusantium,
                nostrum minima quidem ipsa, officia eum sint culpa quisquam
                quas, et voluptatibus corrupti. Quaerat, adipisci reiciendis
                quis esse iure numquam!
              </p>
            </div>
            <div className="user-post">
              <h3>How do I construc</h3>
              <h5>From: bender9000</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores nemo soluta non deserunt rem esse quia expedita
                deleniti ullam amet, repellat doloribus totam earum fuga
                consectetur cupiditate. Quibusdam aspernatur accusantium,
                nostrum minima quidem ipsa, officia eum sint culpa quisquam
                quas, et voluptatibus corrupti. Quaerat, adipisci reiciendis
                quis esse iure numquam!
              </p>
            </div>
            <div className="user-post">
              <h3>How do I construc</h3>
              <h5>From: bender9000</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores nemo soluta non deserunt rem esse quia expedita
                deleniti ullam amet, repellat doloribus totam earum fuga
                consectetur cupiditate. Quibusdam aspernatur accusantium,
                nostrum minima quidem ipsa, officia eum sint culpa quisquam
                quas, et voluptatibus corrupti. Quaerat, adipisci reiciendis
                quis esse iure numquam!
              </p>
            </div>
            <div className="user-post">
              <h3>How do I construc</h3>
              <h5>From: bender9000</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores nemo soluta non deserunt rem esse quia expedita
                deleniti ullam amet, repellat doloribus totam earum fuga
                consectetur cupiditate. Quibusdam aspernatur accusantium,
                nostrum minima quidem ipsa, officia eum sint culpa quisquam
                quas, et voluptatibus corrupti. Quaerat, adipisci reiciendis
                quis esse iure numquam!
              </p>
            </div>
            <div className="user-post">
              <h3>How do I construc</h3>
              <h5>From: bender9000</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores nemo soluta non deserunt rem esse quia expedita
                deleniti ullam amet, repellat doloribus totam earum fuga
                consectetur cupiditate. Quibusdam aspernatur accusantium,
                nostrum minima quidem ipsa, officia eum sint culpa quisquam
                quas, et voluptatibus corrupti. Quaerat, adipisci reiciendis
                quis esse iure numquam!
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
