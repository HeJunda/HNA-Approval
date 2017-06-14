package cn.Bohai.mapper;

import cn.Bohai.model.User;

import java.util.List;

/**
 * Created by Jaye on 2017/5/13.
 */
//@Mapper
public interface UserMapper {
    public void addUser(User user);
    public User getUserById(int id);
    public List<User> getUserByName(String name);
    public List<User> getAllUserlist();
}
