package com.rms.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rms.dtos.PopularDishDto;
import com.rms.entities.OrderDetails;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Long> {
	@Query("""
		    SELECT new com.rms.dtos.PopularDishDto(
		        od.menu.id,
		        od.menu.item_name,
		        od.menu.description,
		        SUM(od.quantity) as totalOrdered,
		        od.menu.price,
		        od.menu.imageUrl
		    )
		    FROM OrderDetails od
		    GROUP BY od.menu.id, od.menu.item_name, od.menu.price, od.menu.imageUrl
		    ORDER BY totalOrdered DESC
		""")
		List<PopularDishDto> findPopularDishes(Pageable pageable);

}
