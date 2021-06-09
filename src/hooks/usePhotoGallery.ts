import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from "@capacitor/camera";


export async function takePhoto() {
    const cameraPhoto:any = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
    });
    const textBlob = cameraPhoto.webPath;

    const base64Data = await base64FromPath(textBlob);
    return base64Data
}

// export interface UserPhoto {
//     filepath: string;
//     webviewPath?: string;
// }

export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string')
        }
      };
      reader.readAsDataURL(blob);
    });
  }