package com.rms.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rms.dtos.MenuResp;
import com.rms.entities.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	Collection<Menu> findByCategoryId(Long categoryId);

	Collection<Menu> findByCategory_Id(Long categoryId);

}
