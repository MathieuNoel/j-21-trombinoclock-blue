## Liste requête SQL

```SQL
  -- toutes les promos dans l'ordre alphabétique
  SELECT * FROM "promo" ORDER BY "name";
```

```SQL
  -- tous les étudiants, dans l'ordre alphabétique des noms de famille
  SELECT * FROM "student" ORDER BY "last_name";
```

```SQL
  -- tous les étudiants de la promo 135
  SELECT * FROM "student" WHERE "promo_id" = 135;
```

```SQL
  -- les étudiants dont le nom ou le prénom ressemble à "max"
  -- l'opérateur LIKE sensible à la casse
  SELECT * FROM "student" WHERE "last_name" LIKE '%Max%' OR "first_name" LIKE '%Max%';

  -- ILIKE pour une recherche insensible à la casse

  SELECT * FROM "student" WHERE "last_name" ILIKE '%max%' OR "first_name" ILIKE '%max%';

```

```SQL
  -- Insérer dans la table "student" un étudiant qui s'appelle "Chuck Norris" appartenant à la promo 5
  INSERT INTO "student" ("first_name","last_name","promo_id") VALUES ("Chuck","Norris",5);

```

```SQL
  --Insérer dans la table "promo" une promo qui s'appelle "César" et ne possède pas d'orga
  INSERT INTO "promo" ("id","name") VALUES (440,"César");
``` 

```SQL
  --Mettre à jour la promo 5 pour la renommer "Cleo"
  UPDATE "promo" SET name="Cleo" WHERE "id"= 5; 
```

```SQL
  --Supprimer la promo 123
  DELETE FROM "promo" WHERE "id"= 123;
```