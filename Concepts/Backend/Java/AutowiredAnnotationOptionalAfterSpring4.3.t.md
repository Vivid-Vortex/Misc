 Spring does automatically inject dependencies into a bean if it has only one constructor with parameters. This feature, commonly known as constructor autowiring, has been available since Spring 3.0, released in June 2011
 
Spring 4.3 introduced an improvement where the @Autowired annotation becomes optional for single-parameter constructors. However, using @Autowired provides clear intent and can enhance readability.
Consider using constructor-based injection over setter-based injection whenever possible, as it promotes immutability and cleaner object creation.

