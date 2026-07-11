import { Camera, ContentType } from "./types";

export type ButtonProps = {
    handleClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
};

export type RecommendationCardProps = {
    index: number;
    recommendation: Camera;
    selectedContentTypes: Array<ContentType>;
};