import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetSearchListResponseDto extends ResponseDto {
    searchList: BoardListItem[];
}