package com.srmpjt.boardback.dto.object;

import com.srmpjt.boardback.repository.resultSet.GetFavoriteListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteListItem {
    private String email;
    private String nickname;
    private String profileImage;

    // # ResultSet을 인자로 받아, 필드 값들을 초기화
    public FavoriteListItem(GetFavoriteListResultSet resultSet) {
        this.email = resultSet.getEmail();
        this.nickname = resultSet.getNickname();
        this.profileImage = resultSet.getProfileImage();
    }

    // # ResultSet의 List를 loop -> 생성자 호출 -> FavoriteListItem의 List에 담아서 반환
    public static List<FavoriteListItem> copyList(List<GetFavoriteListResultSet> resultSets) {
        List<FavoriteListItem> list = new ArrayList<>();

        for (GetFavoriteListResultSet resultSet : resultSets) {
            FavoriteListItem favoriteListItem = new FavoriteListItem(resultSet);
            list.add(favoriteListItem);
        }
        return list;
    }
}
