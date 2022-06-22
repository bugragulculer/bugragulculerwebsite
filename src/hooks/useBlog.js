import { useDidMount } from "../hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSingleBlog } from "../firebase/blogFunctions";

const useProduct = (id) => {
  // get and check if product exists in store
  const storeBlog = useSelector((state) =>
    state.blog.items.find((item) => item.id === id)
  );

  const [blog, setBlog] = useState(storeBlog);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!blog || blog.id !== id) {
          setLoading(true);
          const doc = await getSingleBlog(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              console.log(data);
              setBlog(data);
              setLoading(false);
            }
          } else {
            setError("Product not found.");
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || "Something went wrong.");
        }
      }
    })();
  }, [id]);

  return { blog, isLoading, error };
};

export default useProduct;
