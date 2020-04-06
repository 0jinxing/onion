declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg";
declare module "*.gif";

declare module "*.pac" {
  const content: string;
  export default content;
}
