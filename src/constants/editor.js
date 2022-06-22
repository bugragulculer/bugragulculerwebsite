import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export const EditorTools = {
  paragraph: Paragraph,
  embed: Embed,
  list: List,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file) {
          console.log("file", file);
          var storageRef = ref(storage, "EditorJS");
          var imagesRef = ref(storageRef, "images/" + file.lastModified);

          var metadata = {
            contentType: "image/jpeg",
          };
          await uploadBytes(imagesRef, file, metadata);

          const downloadURL = await getDownloadURL(ref(imagesRef));
          return {
            success: 1,
            file: {
              url: downloadURL,
            },
          };
        },
      },
    },
  },
  header: Header,
  quote: Quote,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
