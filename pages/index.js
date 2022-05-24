import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addAlbum } from "../redux/reducers/slice";
import styles from "../styles/Home.module.css";
// import img from "../public/unnamed.jpg";

// export const getStaticProps = async() => {
//   const res =  await fetch("https://random.imagecdn.app/500/150")
//   const data = await res.json();

//   return {
//     props: { ranImage: data }
//   }
// }

export default function Home() {
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("");
  const [ranImage, setRanImage] = useState("")
  const [loading,setLoading] = useState(true)

  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch("https://random.imagecdn.app/500/150").then((res) => {
      // console.log("--res", res)
      setRanImage(res.url)
    }).catch((e) => {
      console.log("error", e)
    })
    setLoading(false)
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setCaption(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(caption.trim() !== "" && tag !== "") {
    const data = {
      caption: caption,
      tag: tag,
      Image: ranImage,
    };

    // console.log("---", caption, "===", tag, "---image", ranImage);
    localStorage.setItem("data", JSON.stringify(data));
    dispatch(addAlbum(data))
    setCaption("");
    setTag("");
    Router.push('/home')
   }
   else{
     alert(`Caption/Tag cannot be empty`)
   }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}> Test-task</h1>
        <div>
          <button
            type="text"
            className={styles.button}
          >
            <Link href="/home"> Home</Link>
          </button>
        </div>

        <div className={styles.grid}>
          <form className={styles.card}>
            <div className="d-block">
            { !loading ?  
              <img src={ranImage} alt="random" width={200} height={150} />
              : <div className={styles.loader}>
                ...
              </div>
            }
              <center>
                {" "}
                <input
                  type="text"
                  name="caption"
                  placeholder="Caption"
                  className={styles.input}
                  value={caption}
                  onChange={handleChange}
                ></input>
                <div>
                  <select
                    className={styles.select}
                    value={tag}
                    onChange={(e) => {
                      setTag(e.target.value);
                    }}
                  >
                    <option value="">select a tag</option>
                    <option value="Mountains">Mountains</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Hills">Hills</option>
                    <option value="Flowers">Flowers</option>
                    <option value="random">random</option>
                  </select>
                </div>
              </center>
              <div style={{ display: "flex" }}>
                <button
                  type="submit"
                  className={styles.button}
                  onClick={onSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
