import { CommentListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetCommentResponseDto extends ResponseDto {
    commentList: CommentListItem[];
}