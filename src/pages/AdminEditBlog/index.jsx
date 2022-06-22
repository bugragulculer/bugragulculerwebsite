import React, { useState, useEffect, useRef } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import { EditorTools } from "../../constants/editor";
import { AdminNav } from "../../components";
import { useFileHandler } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { editBlog } from "../../state/actions/blogActions";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllTags } from "../../state/actions/tagsActions";
import { displayActionMessage } from "../../utils";

const AdminEditBlog = () => {
  let editor = null;
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const tags = useSelector((state) => state.tags);
  const blogPost = useSelector((state) =>
    state.blog.items.filter((item) => item.id === params.id)
  );

  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [inputs, setInputs] = useState({
    name: blogPost[0].name,
    description: blogPost[0].description,
    images: blogPost[0].images,
    isFeatured: blogPost[0].isFeatured,
    tags: blogPost[0].tags,
    author: blogPost[0].author,
    publish: blogPost[0].publish,
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
    if (inputs.name === "") {
      displayActionMessage("Please enter a valid Product Name", "error");
    } else if (inputs.description === "") {
      displayActionMessage("Please enter a valid Product Description", "error");
    } else if (inputs.images.length === 0) {
      displayActionMessage("Please enter a valid Product Images", "error");
    } else if (inputs.tags.length === 0) {
      displayActionMessage("Please enter at least one tag", "error");
    } else if (inputs.author === "") {
      displayActionMessage("Please enter an author", "error");
    } else if (inputs.publish === "") {
      displayActionMessage("Please enter the publish date", "error");
    } else {
      await dispatch(
        editBlog({
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

  useEffect(() => {
    setSelectedTags(initialInputs.current.tags);
  }, []);

  useEffect(() => {
    setInputs(initialInputs.current);
  }, [initialInputs]);

  return (
    <div>
      <div className="admin__page__container">
        <AdminNav location={location.pathname} />
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
              defaultValue={initialInputs.current.name}
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
                  {initialInputs?.current?.images?.length >= 1 &&
                    initialInputs.current.images.map((e) => (
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
            <div
              className="product__description"
              //onClick={() => editor.focus()}
            >
              <EditorJs
                placeholder="Product Description"
                tools={EditorTools}
                // will be `editorjs` by default
                holder="custom-editor-container"
                onChange={onSave}
                editorInstance={(editorInstance) => {
                  // invoked once the editorInstance is ready
                  editor = editorInstance;
                }}
                data={initialInputs?.current?.description}
                minHeight="20px"
              >
                <div id="custom-editor-container" />
              </EditorJs>
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
          </div>
          <div className="input__grid">
            <label>
              Published Date
              <input
                type="date"
                name="publish"
                onChange={handleChange}
                id=""
                defaultValue={initialInputs.current.publish}
              />
            </label>
            <label>
              Author
              <select
                name="author"
                onChange={handleChange}
                id=""
                defaultValue={initialInputs.current.author}
              >
                <option value=""></option>
                <option value="bugra">Buğra Gülcüler</option>
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
            update post
          </button>
          <button
            type="submit"
            onClick={() => navigate("/admin/blog_posts")}
            className="button--outline button--large"
          >
            discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditBlog;
