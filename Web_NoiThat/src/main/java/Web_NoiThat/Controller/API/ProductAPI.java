package Web_NoiThat.Controller.API;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Web_NoiThat.Bean.Product;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
@RestController(value = "ProductAPI")
public class ProductAPI {
	@Autowired
	SessionFactory factory;
	@RequestMapping(value = "/api/manager_product",method = RequestMethod.POST)
	public Product createProduct(@RequestBody Product product){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.save(product);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
		
		return product;
	}
	@RequestMapping(value = "/api/manager_product",method = RequestMethod.PUT)
	public void updateProduct(@RequestParam("id") int id,
            @RequestBody Product products){
		Session s = factory.getCurrentSession();
		Product product = (Product) s.get(Product.class,id);
		product.setCategory(products.getCategory());
		product.setDescription(products.getDescription());
		product.setPrice(products.getPrice());
		product.setProductName(products.getProductName());
		product.setQuantity(products.getQuantity());
		product.setPictureProduct(products.getPictureProduct());
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.update(product);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/manager_product",method = RequestMethod.DELETE)
	public void deleteProduct(@RequestParam("id") int id){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			Session s = factory.getCurrentSession();
			Product user = (Product) s.get(Product.class, id);
			session.delete(user);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/selectAllProduct",method = RequestMethod.GET)
	public ResponseEntity<List<Product>> selectAll(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Product"; 
		List<Product> listProduct= session.createQuery(hql).list();
		t.commit();
		if(listProduct.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Product>>(listProduct, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectProductByName", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> findByName(@RequestParam("name") String name) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Product WHERE name LIKE :name";
		Query query = session.createQuery(hql);
		query.setParameter("name", name);
		List<Product> listProductByName = query.list();
		if(listProductByName == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Product>>(listProductByName, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectProductByCategory", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> findByCategory(@RequestParam("category") String category) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Product WHERE category LIKE :category";
		Query query = session.createQuery(hql);
		query.setParameter("category", category);
		List<Product> listProductByCategory = query.list();
		if(listProductByCategory == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Product>>(listProductByCategory, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectProductById", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> findById(@RequestParam("id") int id) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Product WHERE id = :id";
		Query query = session.createQuery(hql);
		query.setParameter("id", id);
		List<Product> listProductById = query.list();
		if(listProductById == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Product>>(listProductById, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectProductNew", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> findProductNew() {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Product ORDER BY id DESC";
		Query query = session.createQuery(hql);
		List<Product> listProductNew = query.list();
		if(listProductNew == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Product>>(listProductNew, HttpStatus.OK);
	}
}
