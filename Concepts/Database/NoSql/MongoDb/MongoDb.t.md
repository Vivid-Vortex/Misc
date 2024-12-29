How to form relationships between MongoDb Documents(equivalent to sql tables):

	In MongoDB, referencing and embedding are two different ways to handle relationships between documents. Here’s an explanation of each approach with code examples:

	### Embedding Documents

	Embedding involves nesting a document inside another document. This is useful for one-to-few relationships where the embedded data is tightly coupled with the parent document.

	#### Example: Embedding `CustomerDatasourceDetails` in `ProductSchemaMapping`

	##### ProductSchemaMapping Entity

	```java
	import org.springframework.data.annotation.Id;
	import org.springframework.data.mongodb.core.mapping.Document;
	import org.bson.types.ObjectId;
	import java.util.List;

	@Document(collection = "Product_schema_mapping")
	public class ProductSchemaMapping {
			@Id
			private ObjectId id;
			private String schemaId;
			private String schemaVersion;
			private String productName;
			private List<CustomerDatasourceDetails> customerDatasourceDetails;  // Embedded documents

			// Getters and Setters
	}
	```

	##### CustomerDatasourceDetails Entity

	```java
	public class CustomerDatasourceDetails {
			private String realmId;
			private String dbName;
			private String schemaName;
			private String displayedSchemaName;

			// Getters and Setters
	}
	```

	##### Service Implementation (for embedding)

	```java
	@Service
	public class ProductSchemaService {
			private final ProductSchemaMappingRepository productSchemaMappingRepository;

			@Autowired
			public ProductSchemaService(ProductSchemaMappingRepository productSchemaMappingRepository) {
					this.productSchemaMappingRepository = productSchemaMappingRepository;
			}

			@Transactional
			public ProductSchemaMapping saveProductSchemaMapping(ProductSchemaMapping productSchemaMapping) {
					return productSchemaMappingRepository.save(productSchemaMapping);
			}

			public ProductSchemaMapping getProductSchemaMapping(String schemaId) {
					return productSchemaMappingRepository.findBySchemaId(schemaId)
									.orElseThrow(() -> new ResourceNotFoundException("Schema not found"));
			}
	}
	```

	### Referencing Documents

	Referencing involves storing the reference (usually an ObjectId) to another document instead of embedding the entire document. This is useful for one-to-many or many-to-many relationships, or when the referenced documents are reused across multiple documents.

	#### Example: Referencing `CustomerDatasourceDetails` in `ProductSchemaMapping`

	##### ProductSchemaMapping Entity

	```java
	import org.springframework.data.annotation.Id;
	import org.springframework.data.mongodb.core.mapping.Document;
	import org.bson.types.ObjectId;
	import java.util.List;

	@Document(collection = "Product_schema_mapping")
	public class ProductSchemaMapping {
			@Id
			private ObjectId id;
			private String schemaId;
			private String schemaVersion;
			private String productName;
			private List<ObjectId> customerDatasourceDetailIds;  // References to CustomerDatasourceDetails

			// Getters and Setters
	}
	```

	##### CustomerDatasourceDetails Entity

	```java
	import org.springframework.data.annotation.Id;
	import org.springframework.data.mongodb.core.mapping.Document;
	import org.bson.types.ObjectId;

	@Document(collection = "Customer_datasource_details")
	public class CustomerDatasourceDetails {
			@Id
			private ObjectId id;
			private String schemaId;
			private String realmId;
			private String dbName;
			private String schemaName;
			private String displayedSchemaName;

			// Getters and Setters
	}
	```

	##### Service Implementation (for referencing)

	```java
	@Service
	public class ProductSchemaService {
			private final ProductSchemaMappingRepository productSchemaMappingRepository;
			private final CustomerDatasourceDetailsRepository customerDatasourceDetailsRepository;

			@Autowired
			public ProductSchemaService(ProductSchemaMappingRepository productSchemaMappingRepository,
																	CustomerDatasourceDetailsRepository customerDatasourceDetailsRepository) {
					this.productSchemaMappingRepository = productSchemaMappingRepository;
					this.customerDatasourceDetailsRepository = customerDatasourceDetailsRepository;
			}

			@Transactional
			public RealmDatasourcesModel saveRealmDatasources(String schemaId, List<RealmDatasourceModel> realmDatasources) {
					Optional<ProductSchemaMapping> productSchemaMappingOpt = productSchemaMappingRepository.findBySchemaId(schemaId);
					ProductSchemaMapping productSchemaMapping = productSchemaMappingOpt.orElseGet(() -> {
							ProductSchemaMapping newProductSchemaMapping = new ProductSchemaMapping();
							newProductSchemaMapping.setSchemaId(schemaId);
							return newProductSchemaMapping;
					});

					List<ObjectId> customerDatasourceDetailIds = realmDatasources.stream()
									.map(dto -> {
											CustomerDatasourceDetails entity = new CustomerDatasourceDetails();
											entity.setSchemaId(schemaId);
											entity.setRealmId(dto.getRealmId());
											entity.setDbName(dto.getDbName());
											entity.setSchemaName(dto.getSchemaName());
											entity.setDisplayedSchemaName(dto.getSchemaName());
											return customerDatasourceDetailsRepository.save(entity).getId();
									})
									.collect(Collectors.toList());

					productSchemaMapping.setCustomerDatasourceDetailIds(customerDatasourceDetailIds);
					productSchemaMappingRepository.save(productSchemaMapping);

					return new RealmDatasourcesModel(realmDatasources);
			}

			public RealmDatasourcesModel getRealmDatasources(String schemaId) {
					ProductSchemaMapping productSchemaMapping = productSchemaMappingRepository.findBySchemaId(schemaId)
									.orElseThrow(() -> new ResourceNotFoundException("Schema not found"));

					List<RealmDatasourceModel> realmDatasources = productSchemaMapping.getCustomerDatasourceDetailIds().stream()
									.map(id -> {
											CustomerDatasourceDetails details = customerDatasourceDetailsRepository.findById(id)
															.orElseThrow(() -> new ResourceNotFoundException("Datasource not found"));
											RealmDatasourceModel dto = new RealmDatasourceModel();
											dto.setRealmId(details.getRealmId());
											dto.setDbName(details.getDbName());
											dto.setSchemaName(details.getSchemaName());
											return dto;
									})
									.collect(Collectors.toList());

					return new RealmDatasourcesModel(realmDatasources);
			}

			@Transactional
			public void deleteRealmDatasource(String schemaId, String realmId) {
					ProductSchemaMapping productSchemaMapping = productSchemaMappingRepository.findBySchemaId(schemaId)
									.orElseThrow(() -> new ResourceNotFoundException("Schema not found"));

					List<ObjectId> filteredIds = productSchemaMapping.getCustomerDatasourceDetailIds().stream()
									.filter(id -> {
											CustomerDatasourceDetails details = customerDatasourceDetailsRepository.findById(id).orElse(null);
											return details != null && !details.getRealmId().equals(realmId);
									})
									.collect(Collectors.toList());

					productSchemaMapping.setCustomerDatasourceDetailIds(filteredIds);
					productSchemaMappingRepository.save(productSchemaMapping);

					customerDatasourceDetailsRepository.deleteBySchemaIdAndRealmId(schemaId, realmId);
			}
	}
	```

	### Summary

	- **Embedding**: Nesting one document inside another. Suitable for closely related data. Simplifies read operations since all data is in one document but can lead to duplication and larger document sizes.
	- **Referencing**: Storing references (usually ObjectIds) to other documents. Suitable for data that needs to be shared across multiple documents. Provides flexibility and avoids duplication but requires additional lookups to fetch related data.

	Choosing between embedding and referencing depends on the use case, data access patterns, and the nature of the relationship between documents.
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------