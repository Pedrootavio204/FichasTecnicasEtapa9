
package com.senac.fichastecnicas.repository;

import com.senac.fichastecnicas.model.FichaTecnica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FichaTecnicaRepository
        extends JpaRepository<FichaTecnica, Long> {
}
