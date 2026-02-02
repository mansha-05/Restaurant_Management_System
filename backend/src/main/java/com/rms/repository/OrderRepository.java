package com.rms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rms.dtos.NewOrderRowDto;
import com.rms.dtos.OrderRowDto;
import com.rms.entities.OrderDetails;
import com.rms.entities.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

//    @Query("""
//    SELECT DISTINCT o
//    FROM Orders o
//    JOIN FETCH o.reservation r
//    JOIN FETCH r.user u
//    JOIN FETCH r.table t
//    LEFT JOIN FETCH o.orderDetails od
//    LEFT JOIN FETCH od.menu
//    WHERE u.id = :userId
//    """)
//    List<Orders> findOrdersByUserId(Long userId);
    
	@Query("""
			SELECT new com.rms.dtos.OrderRowDto(
			    o.id,               
			    o.orderDate,       
			    o.orderTime,        
			    t.table_no,         
			    m.item_name,         
			    od.quantity,        
			    m.price,           
			    o.totalAmount      
			)
			FROM OrderDetails od
			JOIN od.order o
			JOIN o.reservation r
			JOIN r.user u
			JOIN r.table t
			JOIN od.menu m
			WHERE u.id = :userId
			""")
			List<OrderRowDto> findOrderRowsByUserId(Long userId);
	
		@Query("""
				SELECT new com.rms.dtos.NewOrderRowDto(
				    o.id,
				    u.name,
				    CONCAT(od.quantity, 'x ', m.item_name),
				    t.table_no,
				    o.totalAmount,
				    o.orderDate,
				    o.orderTime
				)
				FROM OrderDetails od
				JOIN od.order o
				JOIN o.reservation r
				JOIN r.user u
				JOIN r.table t
				JOIN od.menu m
				""")
				List<NewOrderRowDto> fetchRawOrderRows();
	
		
			@Query("""
					SELECT new com.rms.dtos.NewOrderRowDto(
					    o.id,
					    u.name,
					    CONCAT(od.quantity, 'x ', m.item_name),
					    t.table_no,
					    o.totalAmount,
					    o.orderDate,
					    o.orderTime
					)
					FROM OrderDetails od
					JOIN od.order o
					JOIN o.reservation r
					JOIN r.user u
					JOIN r.table t
					JOIN od.menu m
					WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))
					""")
				List<NewOrderRowDto> searchOrdersByCustomer(@Param("name") String name);

}
