import React, { useState, useEffect, useRef } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import { EditorTools } from "../../constants/editor";
import { AdminNav } from "../../components";
import { useFileHandler } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../state/actions/blogActions";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllTags } from "../../state/actions/tagsActions";
import { displayActionMessage } from "../../utils";
import { addTag } from "../../state/actions/tagsActions";

const AdminAddBlog = () => {
  let editor = null;
  const dispatch = useDispatch();
  const params = useLocation();
  const navigate = useNavigate();
  const tags = useSelector((state) => state.tags);

  const [content, setContent] = useState("");
  const [newTag, setNewTag] = useState({ tag: "", etiket: "" });
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    images: "",
    isFeatured: "off",
    tags: [],
    author: "",
    publish: "",
    language: "",
  });
  const initialInputs = useRef(inputs);

  const { imageFile, onFileChange } = useFileHandler({ images: [] });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSave = async () => {
    try {
      const outputData = await editor.save();
      setContent(outputData);
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };

  console.log(content)

  useEffect(() => {
    setInputs((values) => ({ ...values, images: imageFile.images }));
  }, [imageFile]);

  useEffect(() => {
    setInputs((values) => ({ ...values, description: content }));
  }, [content]);

  useEffect(() => {
    setInputs((inputs) => ({ ...inputs, tags: selectedTags }));
  }, [selectedTags]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.name === initialInputs.current.name) {
      displayActionMessage("Please enter a valid Product Name", "error");
    } else if (inputs.description === initialInputs.current.description) {
      displayActionMessage("Please enter a valid Product Description", "error");
    } else if (inputs.images === initialInputs.current.images) {
      displayActionMessage("Please enter a valid Product Images", "error");
    } else if (inputs.tags.length === initialInputs.current.tags.length) {
      displayActionMessage("Please enter at least one tag", "error");
    } else if (inputs.author === initialInputs.current.author) {
      displayActionMessage("Please enter an author", "error");
    } else if (inputs.publish === initialInputs.current.publish) {
      displayActionMessage("Please enter the publish date", "error");
    } else if (inputs.langauge === initialInputs.current.language) {
      displayActionMessage("Please select a language", "error");
    } else {
      dispatch(
        addBlog({
          ...inputs,
          images: imageFile.images,
        })
      );
      navigate("/admin/blog_posts");
    }
  };

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const handleTags = (tag) => {
    selectedTags.filter((f) => f.id === tag.id).length > 0
      ? setSelectedTags(
          selectedTags.filter(function (value) {
            return tag !== value;
          })
        )
      : setSelectedTags((tags) => [...tags, tag]);
  };

  const handleTagSubmit = async () => {
    console.log("here", newTag);
    if (newTag.tag === "") {
      displayActionMessage("Enter a valid tag", "error");
    } else if (newTag.etiket === "") {
      displayActionMessage("Enter a valid etiket", "error");
    } else {
      await dispatch(
        addTag({
          tag: newTag.tag,
          etiket: newTag.etiket,
        })
      );
    }
  };

  return (
    <div className="admin__page__container">
      <AdminNav location={params.pathname} />
      <div onSubmit={handleSubmit} className="admin__add__blog">
        <h3>New Blog Post</h3>
        <label>
          Blog Title
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Blog Header"
            className="header__input"
          />
        </label>
        <div>
          <label>
            <div>
              Main Image
              <input
                hidden
                id="product-input-file-collection"
                onChange={(e) =>
                  onFileChange(e, { name: "images", type: "multiple" })
                }
                className="field"
                type="file"
              />
            </div>
            <div className="file__collection__wrapper">
              <div className="file__collection">
                {inputs.images.length >= 1 &&
                  inputs.images.map((e) => (
                    <div key={e.id}>
                      <img src={e.url} alt="" />
                    </div>
                  ))}
              </div>
              {inputs.images.length === 0 && (
                <p>Click Here to Upload Digital Files</p>
              )}
            </div>
          </label>
        </div>
        <label>
          Blog Body
          <div className="product__description">
            <EditorJs
              placeholder="Product Description"
              tools={EditorTools}
              onChange={onSave}
              editorInstance={(editorInstance) => {
                editor = editorInstance;
              }}
            />
          </div>
        </label>
        Tags
        <div className="tags__group__container">
          <div className="tags__group">
            {tags.items.map((e) => (
              <button
                onClick={() => handleTags(e)}
                className={
                  selectedTags.filter((f) => f.id === e.id).length > 0
                    ? "button__active"
                    : undefined
                }
              >
                {e.tag}, {e.etiket}
              </button>
            ))}
          </div>
          <div>
            <label>
              new tag
              <input
                type="text"
                placeholder="new tag"
                onChange={(e) =>
                  setNewTag((tags) => ({ ...tags, tag: e.target.value }))
                }
              />
            </label>
            <label>
              new tag in turkish
              <input
                type="text"
                placeholder="new tag"
                onChange={(e) =>
                  setNewTag((tags) => ({ ...tags, etiket: e.target.value }))
                }
              />
            </label>
            <button
              className="button--outline button--medium"
              onClick={handleTagSubmit}
            >
              add
            </button>
          </div>
        </div>
        <div className="input__grid">
          <label>
            Published Date
            <input type="date" name="publish" onChange={handleChange} id="" />
          </label>
          <label>
            Author
            <select name="author" onChange={handleChange} id="">
              <option value=""></option>
              <option value="bugra">Buğra Gülcüler</option>
            </select>
          </label>
          <label>
            Language
            <select name="language" onChange={handleChange} id="">
              <option value=""></option>
              <option value="tr">TR</option>
              <option value="en">EN</option>
            </select>
          </label>
          <label>
            Featured?
            <input
              type="checkbox"
              name="isFeatured"
              id=""
              onClick={() =>
                inputs.isFeatured === "on"
                  ? setInputs((inputs) => ({ ...inputs, isFeatured: "off" }))
                  : setInputs((inputs) => ({ ...inputs, isFeatured: "on" }))
              }
              checked={inputs.isFeatured === "on"}
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="button--primary button--large"
        >
          Save Post
        </button>
      </div>
    </div>
  );
};

export default AdminAddBlog;
