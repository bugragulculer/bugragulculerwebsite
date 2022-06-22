import React from "react";
import { useLocation } from "react-router-dom";
import { AdminNav } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { addTag, removeTag } from "../../state/actions/tagsActions";
import { displayActionMessage } from "../../utils";

const AdminTags = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const tagList = useSelector((state) => state.tags);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      displayActionMessage("Enter a valid tag");
    } else if (e.target[1].value === "") {
      displayActionMessage("Enter a valid etiket");
    } else {
      await dispatch(
        addTag({
          tag: e.target[0].value,
          etiket: e.target[1].value,
        })
      );
    }
  };

  const handleDelete = async (id) => {
    await dispatch(
      removeTag(id))
  }

  return (
    <div className="admin__page__container">
      <AdminNav location={params.pathname} />
      <div className="tags__container">
        <form onSubmit={handleSubmit}>
          <label>
            new tag in english
            <input type="text" placeholder="new tag" />
          </label>
          <label>
            new tag in turkish
            <input type="text" placeholder="new tag" />
          </label>
          <button className="button--primary button--large" type="submit">
            add
          </button>
        </form>
        <div>
          {tagList.items.length > 0 &&
            tagList.items.map((e) => (
              <span>
                <p>{e.tag}, {e.etiket}</p>
                <div>
                  <button className="button--primary button--medium">
                    edit tag
                  </button>
                  <button className="button--outline button--medium" onClick={() => handleDelete(e.id)}>
                    delete tag
                  </button>
                </div>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTags;
