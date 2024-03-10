package com.srmpjt.boardback.dto.object;

import com.srmpjt.boardback.repository.resultSet.GetCommentListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentListItem {
     private String nickname;
     private String profileImage;
     private String writeDatetime;
     private String content;

     public CommentListItem(GetCommentListResultSet resultSet) {
          this.nickname = resultSet.getNickname();
          this.profileImage = resultSet.getProfileImage();
          this.writeDatetime = resultSet.getWriteDatetime();
          this.content = resultSet.getContent();
     }

     public static List<CommentListItem> copyList(List<GetCommentListResultSet> resultSetList) {
          List<CommentListItem> list = new ArrayList<>();

          for (GetCommentListResultSet resultSet : resultSetList) {
               CommentListItem commentListItem = new CommentListItem(resultSet);
               list.add(commentListItem);
          }

          return list;
     }
}
