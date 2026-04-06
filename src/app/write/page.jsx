"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./writePage.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from 'next-cloudinary';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const WritePage = () => {
    const { status } = useSession();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [media, setMedia] = useState(""); 

    // useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    // }, [status, router]);

    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }

    const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
        const res = await fetch("https://ccnlthd25-26-adqe.vercel.app/api/posts", {
            method: "POST",
            body: JSON.stringify({ 
                title,
                desc: value,
                img: media, 
                slug: slugify(title),
                catSlug:"travel"
            }), 
        });
        console.log(res)
    };

    return (
        <div className={styles.container}>
            <input 
                type="text" 
                placeholder="Tiêu đề bài viết..." 
                className={styles.input}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* TODO: ADD CATEGORY*/}
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Image src="/plus.png" alt="" width={16} height={16} />
                </button>
                {open && (
                    <div className={styles.add}>
                        {/* 1. Nút Upload ảnh bằng Cloudinary */}
                        <CldUploadWidget 
                            uploadPreset="blog_app"
                            onSuccess={(results) => {
                                setMedia(results.info.secure_url); // Lưu link ảnh vào state media
                                alert("Đã tải ảnh lên thành công!");
                            }}
                        >
                            {({ open }) => (
                                <button className={styles.addButton} onClick={() => open()}>
                                    <Image src="/image.png" alt="" width={16} height={16} />
                                </button>
                            )}
                        </CldUploadWidget>

                        <button className={styles.addButton}>
                            <Image src="/external.png" alt="" width={16} height={16} />
                        </button>
                        <button className={styles.addButton}>
                            <Image src="/video.png" alt="" width={16} height={16} />
                        </button>
                    </div>
                )}
                <ReactQuill
                    className={styles.textArea}
                    theme="bubble"
                    value={value}
                    onChange={setValue}
                    placeholder="Hãy kể câu chuyện của bạn..."
                />
            </div>
            <button className={styles.publish} onClick={handleSubmit}>Đăng bài</button>
            
            {media && <p style={{fontSize:"12px", color:"green"}}>Đã chọn ảnh: {media.substring(0, 50)}...</p>}
        </div>
    );
};

export default WritePage;
