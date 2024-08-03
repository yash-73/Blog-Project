import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {

  const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  useEffect(() => {

    if (post) {
      //   console.log('Resetting form with post data:', post);
      reset({
        title: post.title || "",
        slug: post.$id || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log('Submitting form data ', data);
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-row flex-wrap justify-between max-md:flex-col ">
      <div className="flex flex-col gap-8 justify-center items-center w-[60%] max-md:w-full max-md:px-2 ">
        <Input
          label="Title :  "
          placeholder="Title"
          className="max-md:my-4"
          defaultValue={getValues('title')}
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :  "
          placeholder="Slug"
          className="max-md:my-4"
          defaultValue={getValues('slug')}
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 max-md:my-8 px-8 max-md:w-full">
        <Input
          label="Featured Image :"
          type="file"
          className=" max-md:my-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img

              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-16 outline-none  text-black rounded-lg h-[40px] max-md:mt-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full max-md:my-4">

          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
