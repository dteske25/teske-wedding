import { ReactNode, useCallback, useRef, useState } from "react";
import { Image, Camera, Video, Check, X } from "react-feather";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";

function BigButton(props: {
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className='big-button' onClick={props.onClick}>
      <div>{props.icon}</div>
      <hr className='big-button-divider' />
      <div>{props.label}</div>
    </div>
  );
}

function CaptureScreen(props: { onChange: (e: FileList | null) => void }) {
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "2em",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <BigButton
          onClick={() => pictureRef.current?.click()}
          label='Take a picture'
          icon={<Camera className='icon' />}
        />
        <BigButton
          onClick={() => videoRef.current?.click()}
          label='Record a video'
          icon={<Video className='icon' />}
        />
        <BigButton
          onClick={() => uploadRef.current?.click()}
          label='Camera Roll'
          icon={<Image className='icon' />}
        />
      </div>
      <input
        ref={uploadRef}
        type='file'
        accept='image/*,video/*'
        multiple
        style={{ display: "none" }}
        onChange={(e) => props.onChange(e.target.files)}
      />
      <input
        ref={videoRef}
        type='file'
        accept='video/*'
        capture={true}
        style={{ display: "none" }}
        onChange={(e) => props.onChange(e.target.files)}
      />
      <input
        ref={pictureRef}
        type='file'
        accept='image/*'
        capture={true}
        style={{ display: "none" }}
        onChange={(e) => props.onChange(e.target.files)}
      />
    </>
  );
}

function UploadingScreen() {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
}

function UploadScreen(props: {
  files: FileList;
  clearFiles: () => void;
  uploadFiles: () => void;
}) {
  const { clearFiles, uploadFiles } = props;

  return (
    <>
      <h2>Do you want to upload your files?</h2>

      <div
        style={{
          display: "flex",
          gap: "2em",
          margin: "auto",
        }}
      >
        <BigButton
          onClick={clearFiles}
          label='No'
          icon={<X className='icon' />}
        />
        <BigButton
          onClick={uploadFiles}
          label='Yes'
          icon={<Check className='icon' />}
        />
      </div>
    </>
  );
}

function App() {
  const [fileList, setFileList] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);

  const upload = useCallback(async () => {
    if (!fileList) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    for (const file of fileList) {
      console.log(file);
      formData.append("files", file, file.name);
    }

    try {
      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      setFileList(null);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  }, [fileList, setFileList, setLoading]);

  return (
    <div>
      <h1>Welcome to the Teske Wedding!</h1>
      {loading && <UploadingScreen />}
      {fileList ? (
        <UploadScreen
          files={fileList}
          clearFiles={() => setFileList(null)}
          uploadFiles={() => upload()}
        />
      ) : (
        <CaptureScreen onChange={setFileList} />
      )}
    </div>
  );
}

export default App;
