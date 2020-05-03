declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg";
declare module "*.gif";

declare module "*.txt" {
  const content: string;
  export default content;
}
