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
