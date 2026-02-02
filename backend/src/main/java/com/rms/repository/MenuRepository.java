package com.rms.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rms.dtos.MenuResp;
import com.rms.entities.Menu;
import com.rms.entities.MenuStatus;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	List<Menu> findByStatus(MenuStatus status);

    List<Menu> findByCategory_IdAndStatus(Long categoryId, MenuStatus status);
    
    List<Menu> findByCategory_Id(Long categoryId);

}
