import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const CLOUD_NAME = "db8l1ulfq";
const UPLOAD_PRESET = "bicycle";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

interface FileType {
  uid: string;
  name: string;
  status?: string;
  url?: string;
}
interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void; // Define prop type
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }: any) => {
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = async () => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of fileList) {
      const formData = new FormData();
      formData.append("file", file as any);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Upload Error:", error);
        message.error(`Upload failed for ${file.name}`);
      }
    }

    setUploading(false);
    message.success("All images uploaded successfully!");
    onUploadComplete(uploadedUrls);
    setFileList([]);
  };

  return (
    <div>
      <Upload
        multiple
        listType="picture"
        beforeUpload={(file) => {
          setFileList((prev) => [...prev, file as any]);
          return false; // Prevent auto upload
        }}
        fileList={fileList as any}
        onRemove={(file) => {
          setFileList(fileList.filter((item) => item.uid !== file.uid));
        }}
      >
        <Button icon={<UploadOutlined />}>Select Images</Button>
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 , color:"white"}}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default ImageUpload;
