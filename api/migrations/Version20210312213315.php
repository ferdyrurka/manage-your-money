<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210312213315 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE operation (id INT AUTO_INCREMENT NOT NULL, location_id INT NOT NULL, amount DOUBLE PRECISION NOT NULL, balance_after_surgery DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_1981A66D64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE operation_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slugs LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE operation_category_operation_location (operation_category_id INT NOT NULL, operation_location_id INT NOT NULL, INDEX IDX_18F2994DEA6AA4E4 (operation_category_id), INDEX IDX_18F2994DFE611888 (operation_location_id), PRIMARY KEY(operation_category_id, operation_location_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE operation_location (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE operation_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(64) NOT NULL, slugs LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE operation ADD CONSTRAINT FK_1981A66D64D218E FOREIGN KEY (location_id) REFERENCES operation_type (id)');
        $this->addSql('ALTER TABLE operation_category_operation_location ADD CONSTRAINT FK_18F2994DEA6AA4E4 FOREIGN KEY (operation_category_id) REFERENCES operation_category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE operation_category_operation_location ADD CONSTRAINT FK_18F2994DFE611888 FOREIGN KEY (operation_location_id) REFERENCES operation_location (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation_category_operation_location DROP FOREIGN KEY FK_18F2994DEA6AA4E4');
        $this->addSql('ALTER TABLE operation_category_operation_location DROP FOREIGN KEY FK_18F2994DFE611888');
        $this->addSql('ALTER TABLE operation DROP FOREIGN KEY FK_1981A66D64D218E');
        $this->addSql('DROP TABLE operation');
        $this->addSql('DROP TABLE operation_category');
        $this->addSql('DROP TABLE operation_category_operation_location');
        $this->addSql('DROP TABLE operation_location');
        $this->addSql('DROP TABLE operation_type');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
